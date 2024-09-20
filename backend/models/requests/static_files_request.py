from pydantic import BaseModel


class StaticFileChecksumRequest(BaseModel):
    file_with_checksum: dict[str, str] # filename: checksum