import os
import subprocess

def convert_mkv_to_mp4(mkv_file, output_dir):
    # Generate output mp4 file name
    mp4_file = os.path.join(output_dir, os.path.basename(mkv_file).replace('.mkv', '.mp4'))
    
    # ffmpeg command to convert mkv to mp4
    command = [
        'ffmpeg', '-i', mkv_file, '-c', 'copy', mp4_file
    ]
    
    # Run the command
    print(f"Converting {mkv_file} to {mp4_file}...")
    subprocess.run(command, check=True)
    print(f"Conversion complete: {mp4_file}")
    
def extract_subtitles(mkv_file, output_dir):
    # ffmpeg command to extract subtitles as vtt
    command = [
        'ffmpeg', '-i', mkv_file, '-map', '0:s', '-f', 'webvtt', 
        os.path.join(output_dir, os.path.basename(mkv_file).replace('.mkv', '-subtitle-%d.vtt'))
    ]
    
    # Run the command
    print(f"Extracting subtitles from {mkv_file}...")
    subprocess.run(command, check=True)
    print(f"Subtitles extracted to {output_dir}")
    
def process_mkv_files(input_dir, output_dir):
    # Create the output directory if it doesn't exist
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    # Loop through all .mkv files in the input directory
    for file_name in os.listdir(input_dir):
        if file_name.endswith('.mkv'):
            mkv_file = os.path.join(input_dir, file_name)
            
            # Convert mkv to mp4
            convert_mkv_to_mp4(mkv_file, output_dir)
            
            # Extract subtitles as vtt
            extract_subtitles(mkv_file, output_dir)

if __name__ == "__main__":
    input_directory = './input'  # Change this to your input directory path
    output_directory = './public'  # Change this to your output directory path

    # Process all mkv files in the input directory
    process_mkv_files(input_directory, output_directory)
