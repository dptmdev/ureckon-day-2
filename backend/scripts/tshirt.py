import cv2
import mediapipe as mp
import numpy as np
import sys
import os

# Initialize MediaPipe Pose model
mp_pose = mp.solutions.pose
pose = mp_pose.Pose()

# Initialize drawing utilities to visualize the pose
mp_drawing = mp.solutions.drawing_utils

# Define the path to the images directory
IMAGES_DIR = os.path.abspath('images')

# Load the clothing image (transparent PNG)


def load_clothing_image(product_name):
    # image_path = os.path.join(IMAGES_DIR, f'{product_name}.png')  # Path to the image
    image_path = os.path.join(f'{product_name}.png')
    if not os.path.isfile(image_path):
        print(f"Error: The image file '{image_path}' does not exist.")
        sys.exit(1)
    return cv2.imread(image_path, cv2.IMREAD_UNCHANGED)

# Resize clothing based on body size


def resize_clothing(clothing, scale_width, scale_height):
    return cv2.resize(clothing, (scale_width, scale_height), interpolation=cv2.INTER_AREA)

# Overlay the clothing on the body using pose landmarks


def overlay_clothing(frame, clothing, landmarks):
    left_shoulder = landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER]
    right_shoulder = landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER]
    left_hip = landmarks[mp_pose.PoseLandmark.LEFT_HIP]
    right_hip = landmarks[mp_pose.PoseLandmark.RIGHT_HIP]

    shoulder_width = abs(
        (right_shoulder.x - left_shoulder.x)*1.8) * frame.shape[1]
    torso_height = abs((left_hip.y - left_shoulder.y)*1.4) * frame.shape[0]

    body_width = int(shoulder_width)
    body_height = int(torso_height)

    body_width = max(1, body_width)
    body_height = max(1, body_height)

    x_offset = int((left_shoulder.x + right_shoulder.x) /
                   2 * frame.shape[1]) - body_width // 2
    y_offset = int(int(left_shoulder.y * frame.shape[0]) - body_height // 6.5)

    if x_offset < 0:
        x_offset = 0
    if y_offset < 0:
        y_offset = 0
    if y_offset + body_height > frame.shape[0]:
        body_height = frame.shape[0] - y_offset
    if x_offset + body_width > frame.shape[1]:
        body_width = frame.shape[1] - x_offset

    resized_clothing = resize_clothing(clothing, body_width, body_height)

    if resized_clothing.shape[2] == 4:
        b, g, r, a = cv2.split(resized_clothing)
        alpha = a / 255.0
        inv_alpha = 1.0 - alpha

        for c in range(0, 3):
            frame[y_offset:y_offset + body_height, x_offset:x_offset + body_width, c] = (
                alpha[:, :] * resized_clothing[:, :, c] +
                inv_alpha[:, :] * frame[y_offset:y_offset +
                                        body_height, x_offset:x_offset + body_width, c]
            )
    return frame


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python3 ./scripts/tshirt.py <product_name>")
        sys.exit(1)

    product_name = sys.argv[1]
    clothing_image = load_clothing_image(product_name)

    cap = cv2.VideoCapture(0)

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            print("Failed to grab frame from webcam")
            break

        frame = cv2.flip(frame, 1)
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = pose.process(rgb_frame)

        if results.pose_landmarks:
            mp_drawing.draw_landmarks(
                frame, results.pose_landmarks, mp_pose.POSE_CONNECTIONS)
            landmarks = results.pose_landmarks.landmark
            frame = overlay_clothing(frame, clothing_image, landmarks)

        cv2.imshow('Virtual Try-On', frame)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()
