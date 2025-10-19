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


// const Media = require("../models/Media");
// const { deleteMediaFromCloudinary } = require("../utils/cloudinary");
// const logger = require("../utils/logger");

// // The function deletes the "media/image" of the post that you have deleted
// const handlePostDeleted = async (event) => {
//   console.log(event, "eventeventevent");
//   const { postId, mediaIds } = event;
//   try {
//     if (!mediaIds || !Array.isArray(mediaIds) || mediaIds.length === 0) {
//       logger.info(`No media ids provided for post id ${postId}`);
//       return;
//     }

//     const mediaToDelete = await Media.find({ _id: { $in: mediaIds } });

//     for (const media of mediaToDelete) {
//       try {
//         const cloudResult = await deleteMediaFromCloudinary(media.publicId);
//         logger.info(
//           `Cloudinary delete result for ${media.publicId}: ${JSON.stringify(cloudResult)}`
//         );

//         const deleted = await Media.findByIdAndDelete(media._id);
//         if (deleted) {
//           logger.info(
//             `Deleted media ${media._id} from database for post ${postId}`
//           );
//         } else {
//           logger.warn(
//             `Media ${media._id} was not found in DB when attempting delete (post ${postId})`
//           );
//         }
//       } catch (innerErr) {
//         // Log but continue with next media so one failure doesn't stop others
//         console.error('Error deleting media', innerErr);
//         logger.error('Error deleting media for post', { postId, mediaId: media._id, error: innerErr });
//       }
//     }

//     logger.info(`Processed deletion of media for post id ${postId}`);
//   } catch (e) {
//     console.error(e);
//     logger.error('Error occured while processing media deletions', e);
//   }
// };

// module.exports = { handlePostDeleted };