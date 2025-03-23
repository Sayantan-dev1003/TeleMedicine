import subprocess

# List of all your scripts
scripts = ["Chatbot.py", "Maps.py", "MedicineRecommend.py", "video.py"]

# Start each script in a separate process
processes = [subprocess.Popen(["python", script]) for script in scripts]

# Keep the script running
try:
    for process in processes:
        process.wait()
except KeyboardInterrupt:
    for process in processes:
        process.terminate()
