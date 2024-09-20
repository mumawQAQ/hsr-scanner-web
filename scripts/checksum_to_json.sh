#!/bin/bash

# Script: checksum_to_json.sh
# Description: Calculates SHA-256 checksums for all files in a directory (recursively),
#              excludes specified folders, and outputs the results in JSON format.

# Exit immediately if a command exits with a non-zero status
set -e

# Function to display usage instructions
usage() {
    echo "Usage: $0 /path/to/directory [exclude_dir1 exclude_dir2 ...]"
    echo "Example: $0 /var/www/static images"
    exit 1
}

# Check if at least one argument (directory) is provided
if [ "$#" -lt 1 ]; then
    echo "Error: Directory path is required."
    usage
fi

# Assign the first argument as the target directory
DIRECTORY="$1"
shift  # Shift the arguments to access excluded directories

# Verify that the provided directory exists and is a directory
if [ ! -d "$DIRECTORY" ]; then
    echo "Error: '$DIRECTORY' is not a valid directory."
    exit 1
fi

# Assign the remaining arguments as excluded directories
EXCLUDES=("$@")

# Initialize an array to hold 'find' exclusion parameters
FIND_EXCLUDE_PARAMS=()

# Populate the exclusion parameters for 'find'
for EXCLUDE in "${EXCLUDES[@]}"; do
    FIND_EXCLUDE_PARAMS+=( -path "$DIRECTORY/$EXCLUDE" -prune -o )
done

# Create a temporary file to store intermediate JSON objects
TEMP_FILE=$(mktemp)

# Function to clean up the temporary file upon script exit
cleanup() {
    rm -f "$TEMP_FILE"
}
trap cleanup EXIT

# Use 'find' to locate all files, excluding specified directories
find "$DIRECTORY" "${FIND_EXCLUDE_PARAMS[@]}" -type f -print | while read -r FILE; do
    # Calculate the SHA-256 checksum
    CHECKSUM=$(sha256sum "$FILE" | awk '{print $1}')

    # Derive the relative file path
    REL_PATH="${FILE#$DIRECTORY/}"

    # Create a JSON object for the current file
    jq -n --arg file "$REL_PATH" --arg checksum "$CHECKSUM" \
        '{file: $file, checksum: $checksum}' >> "$TEMP_FILE"
done


CHECKSUM_PATH="/home/ubuntu/static/checksum.json"

# Combine all JSON objects into a single JSON array
jq -s '.' "$TEMP_FILE" > "$CHECKSUM_PATH"

echo "✅ Checksums have been successfully saved to $CHECKSUM_PATH."
