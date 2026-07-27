export type UploadType="image"|"gif";

export type UploadFile={
type:UploadType;
name:string;
size:string;
url:string;
file:File;
};