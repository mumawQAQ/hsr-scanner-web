import json

from fastapi import APIRouter

from backend.models.requests.static_files_request import StaticFileChecksumRequest

router = APIRouter()
CHECKSUM_FILE_PATH = '/app/static/checksum.json'

@router.post("/check_static_files")
def get_requirement_files(request: StaticFileChecksumRequest):
    # read the checksum file
    with open(CHECKSUM_FILE_PATH, 'r') as f:
        checksum_file = json.load(f)
        """
        [
          {
            "file": "relic_sets.json",
            "checksum": "ee70289a53786045f1ee41a6e168fbf49430227d552bb42ab3e15edf86a72f14"
          },
          {
            "file": "relic_imgs.txt",
            "checksum": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
          },
          {
            "file": "character_imgs.txt",
            "checksum": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
          }
        ]
        
        turn to -> 
        {
         "relic_sets.json": "ee70289a53786045f1ee41a6e168fbf49430227d552bb42ab3e15edf86a72f14",
         "relic_imgs.txt": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
         "character_imgs.txt": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
        }
        """
        checksum_file_map = {file['file']: file['checksum'] for file in checksum_file}
        if not request.file_with_checksum:
            # In this case the checksum file is not exist in client side
            # return all the files in checksum file
            return {'status': 'success', 'data': checksum_file_map}
        else:
            # In this case the checksum file is exist in client side
            # check each file in the checksum file
            result = {}
            for file, checksum in checksum_file_map.items():
                if file not in request.file_with_checksum:
                    result[file] = checksum
                elif request.file_with_checksum[file] != checksum:
                    result[file] = checksum

            return {'status': 'success', 'data': result}