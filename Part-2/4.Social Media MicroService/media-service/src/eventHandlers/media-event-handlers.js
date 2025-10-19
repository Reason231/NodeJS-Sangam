const Media = require("../models/Media");
const { deleteMediaFromCloudinary } = require("../utils/cloudinary");
const logger = require("../utils/logger");

// The function deletes the "media/image" of the post that you have deleted
const handlePostDeleted = async (event) => {
  console.log(event, "eventeventevent");
  const { postId, mediaIds } = event;
  try {
    const mediaToDelete = await Media.find({ _id: { $in: mediaIds } });

    for (const media of mediaToDelete) {
      await deleteMediaFromCloudinary(media.publicId);
      await Media.findByIdAndDelete(media._id);

      logger.info(
        `Deleted media ${media._id} associated with this deleted post ${postId}`
      );
    }

    logger.info(`Processed deletion of media for post id ${postId}`);
  } catch (e) {
    console.log(e)
    logger.error(e, "Error occured while media deletion");
  }
};

module.exports = { handlePostDeleted };

