import cv2
from ultralytics import YOLO
from speed import SpeedDirEstimator
import argparse

parser = argparse.ArgumentParser(description="Video processing script.")
parser.add_argument('--video', type=str, required=True, help="Path to the video file.")
parser.add_argument('--isOneWay', type=str, required=True, choices=['y', 'n'], help="Is the road one-way? (y/n)")
args = parser.parse_args()

is_one_way = args.isOneWay.lower() == 'y'

# Load YOLOv8 model
model = YOLO("yolov10n.pt")
# Initialize global variable to store cursor coordinates
names = model.model.names  # This is a dictionary
# line_pts = [(0, 288), (1019, 288)]

# speed_obj = SpeedDirEstimator(reg_pts=line_pts, names=names)

cap = cv2.VideoCapture(args.video)

# Read the first frame to get the frame dimensions
ret, frame = cap.read()
if not ret:
    print("Error: Unable to read video")
    cap.release()
    exit()

frame_height, frame_width = frame.shape[:2]

# Calculate the vertical coordinate as 5% from the bottom of the frame
vertical_coord = int(frame_height * 0.38)
line_pts = [(0, vertical_coord), (frame_width, vertical_coord)]
# line_pts = [(0, 288), (1019, 288)]

speed_obj = SpeedDirEstimator(reg_pts=line_pts, names=names)

# Mouse callback function to capture mouse movement
# def RGB(event, x, y, flags, param):
#     global cursor_point
#     if event == cv2.EVENT_MOUSEMOVE:
#         cursor_point = (x, y)
#         print(f"Mouse coordinates: {cursor_point}")

# # Set up the window and attach the mouse callback function
# cv2.namedWindow('RGB')
# cv2.setMouseCallback('RGB', RGB)

# Open the video file or webcam feed
cap = cv2.VideoCapture(args.video)

count = 0
while True:
    ret, frame = cap.read()

    if not ret:
        print("Video stream ended or cannot be read.")
        break

    count += 1
    if count % 3 != 0:  # Skip some frames for speed (optional)
        continue

    frame = cv2.resize(frame, (1020, 500))
    
    # Perform object tracking
    # 1: bicycle  2: car  3: motorcycle  5: bus  7: truck
    tracks = model.track(frame, persist=True,classes=[1,2,3,5,7])
    
    
    im0 = speed_obj.estimate_speedDir(frame,tracks, is_one_way)
    
    # Display the frame with YOLOv8 results
    cv2.imshow("RGB", frame)

    if cv2.waitKey(1) & 0xFF == ord("q"):
        break

cap.release()
cv2.destroyAllWindows()
