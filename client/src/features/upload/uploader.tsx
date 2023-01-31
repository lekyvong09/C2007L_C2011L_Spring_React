import { Input, Typography } from "@mui/material";

export default function Uploader() {
    const onFileChangeHandler = (e: any) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', e.target.files[0]);
        fetch('http://localhost:8080/api/file/upload', {
            method: 'post',
            body: formData
        }).then(res => {
            if (res.ok) {
                alert("File uploaded successfully");
            }
        });
        console.log(formData);
    };

    return (
        <>
            <Typography variant="h2">
                Uploader
            </Typography>

            <Input type="file" onChange={onFileChangeHandler}/>
        </>
    );
}