import os

# Get the directory of the script
script_dir = os.path.dirname(os.path.abspath(__file__))

# List all files in the directory
files = os.listdir(script_dir)

# Open a file to write the filenames
with open('filenames.txt', 'w') as f:
    for file in files:
        if os.path.isfile(os.path.join(script_dir, file)):
            f.write(file + '\n')
