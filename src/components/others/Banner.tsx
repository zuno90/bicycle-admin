import React from "react";
import {
  DeleteObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { s3Client } from "../../utils/s3.util";
import { notify } from "../../utils/helper.util";
import { ENotificationType } from "../../__types__";

const imageMimeType = /image\/(png|jpg|jpeg|webp)/i;

const Banner = () => {
  const [imgKey, setImgKey] = React.useState<string>("");

  React.useEffect(() => {
    getBannerS3();
  }, []);

  // upload banner to S3
  const handleUploadAppBanner = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      if (!e.target.files[0].type.match(imageMimeType))
        return notify(
          ENotificationType.error,
          "Chỉ cho phép up ảnh định dạng .png, .jpg, .jpeg, .webp!",
          "error"
        );
      // delete old banner
      await deleteBannerS3();
      // upload new banner
      await uploadImageToS3(e.target.files[0]);
    }
  };

  const getBannerS3 = async () => {
    try {
      const getObjParams = new ListObjectsV2Command({
        Bucket: import.meta.env.VITE_AWS_BUCKET_NAME,
        Prefix: "banner",
      });
      const bannerList = await s3Client.send(getObjParams);
      if (!bannerList || !bannerList.Contents)
        throw Error("Can not find image object!");
      const bannerKey = bannerList.Contents[1].Key as string;
      setImgKey(bannerKey);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteBannerS3 = async () => {
    try {
      const params = new DeleteObjectCommand({
        Bucket: import.meta.env.VITE_AWS_BUCKET_NAME,
        Key: imgKey,
      });
      await s3Client.send(params);
    } catch (error) {
      console.error(error);
    }
  };

  const uploadImageToS3 = async (imgFile: File) => {
    try {
      const genFilename = "banner/" + new Date().getTime() + imgFile.name;
      const params = new PutObjectCommand({
        Bucket: import.meta.env.VITE_AWS_BUCKET_NAME,
        Key: genFilename,
        Body: imgFile,
      });
      const s3Img = await s3Client.send(params);
      if (s3Img.$metadata.httpStatusCode !== 200)
        throw new Error("Upload ảnh không thành công, vui lòng thử lại!");
      setImgKey(genFilename);
      // send message
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-10 mb-6">
      <div className="w-full inline-flex items-center justify-between">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          BANNER
        </h4>
      </div>
      <div className="flex flex-col items-center space-y-2">
        <label htmlFor="upload-banner">
          <img
            src={
              imgKey && `${import.meta.env.VITE_AWS_CDN_CLOUDFONT}/${imgKey}`
            }
            className="w-full cursor-pointer"
            alt="app-banner"
          />
          <input
            type="file"
            onChange={handleUploadAppBanner}
            id="upload-banner"
            className="sr-only"
          />
        </label>
        <p className="text-xs sm:text-xl text-meta-1 italic">
          * Click vào ảnh để upload banner cho app
        </p>
      </div>
    </div>
  );
};

export default Banner;
