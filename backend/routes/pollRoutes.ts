import express from "express";
import {
  validatePollAndPollOptionId,
  validatePollBody,
  validatePollId,
} from "../validators/pollValidators";

import pollController from "../controllers/pollController";

const router = express.Router();

router.get("/active", pollController.getActivePoll);

router.get("/active/vote_count", pollController.getActivePollVoteCounts);

router.get("/:poll_id/votes", validatePollId, pollController.getVotesByPoll);

router.post("/new", validatePollBody, pollController.postPoll);

router.post(
  "/:poll_id/poll_option/:poll_option_id/vote",
  validatePollAndPollOptionId,
  pollController.postVote,
);

export default router;
