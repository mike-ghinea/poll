import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Request, Response } from "express";
import prisma from "../config/db";

const getActivePoll = async (req: Request, res: Response) => {
  try {
    const poll = await prisma.poll.findFirstOrThrow({
      where: {
        isActive: true,
      },
    });
    const pollOptions = await prisma.pollOption.findMany({
      where: {
        pollId: poll.id,
      },
      select: {
        id: true,
        text: true,
      },
    });
    res.send({
      poll,
      pollOptions,
    });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        console.error("No active poll found.");
        res.status(404).send({
          message: "No active poll found.",
        });
      } else {
        console.error("Prisma encountered an error:", error);
        res.status(500).send({
          message: "Could not get data from the database.",
        });
      }
    } else {
      console.error("Unexpected error:", error);
      res.status(500).send({
        message: "Unexpected error.",
      });
    }
  }
};

const getActivePollVoteCounts = async (req: Request, res: Response) => {
  try {
    const poll = await prisma.poll.findFirstOrThrow({
      where: {
        isActive: true,
      },
    });
    const pollOptions = await prisma.pollOption.findMany({
      where: {
        pollId: poll.id,
      },
      select: {
        id: true,
        text: true,
        _count: { select: { votes: true } },
      },
    });
    res.send({
      pollOptions: pollOptions.map((pollOption) => {
        return {
          id: pollOption.id,
          text: pollOption.text,
          count: pollOption._count.votes,
        };
      }),
    });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        console.error("No active poll found.");
        res.status(404).send({
          message: "No active poll found.",
        });
      } else {
        console.error("Prisma encountered an error:", error);
        res.status(500).send({
          message: "Could not get data from the database.",
        });
      }
    } else {
      console.error("Unexpected error:", error);
      res.status(500).send({
        message: "Unexpected error.",
      });
    }
  }
};

const getVotesByPoll = async (req: Request, res: Response) => {
  try {
    const poll = await prisma.poll.findFirstOrThrow({
      where: {
        id: Number(req.params.poll_id),
      },
      select: {
        id: true,
        isActive: true,
        question: true,
        votes: {
          select: {
            id: true,
            date: true,
            pollOption: {
              select: {
                id: true,
                text: true,
              },
            },
          },
        },
      },
    });

    res.send(poll);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        console.error(`No poll with id ${req.params.id} found.`);
        res.status(404).send({
          message: `No poll with id ${req.params.id} found.`,
        });
      } else {
        console.error("Prisma encountered an error:", error);
        res.status(500).send({
          message: "Could not get data from the database.",
        });
      }
    } else {
      console.error("Unexpected error:", error);
      res.status(500).send({
        message: "Unexpected error.",
      });
    }
  }
};

const postPoll = async (req: Request, res: Response) => {
  try {
    const currentActivePoll = await prisma.poll.findFirst({
      where: {
        isActive: true,
      },
    });

    if (currentActivePoll)
      await prisma.poll.update({
        where: {
          id: currentActivePoll.id,
        },
        data: {
          isActive: false,
        },
      });

    const newPoll = await prisma.poll.create({
      data: {
        question: req.body.question,
        options: {
          create: req.body.pollOptions.map((option: string) => {
            return {
              text: option,
            };
          }),
        },
        isActive: true,
      },
      select: {
        id: true,
        question: true,
        options: true,
      },
    });

    res.status(201).send({ poll: newPoll });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      console.error("Prisma encountered an error:", error);
      res.status(500).send({
        message: "Could not get data from the database.",
      });
    } else {
      console.error("Unexpected error:", error);
      res.status(500).send({
        message: "Unexpected error.",
      });
    }
  }
};

const postVote = async (req: Request, res: Response) => {
  try {
    const dbErrors = [];

    const poll = await prisma.poll.findFirst({
      where: {
        id: Number(req.params.poll_id),
      },
    });

    const pollOption = await prisma.pollOption.findFirst({
      where: {
        id: Number(req.params.poll_option_id),
        pollId: Number(req.params.poll_id),
      },
    });

    if (!poll) {
      dbErrors.push(`No poll found with id ${req.params.poll_id}`);
    }

    if (!pollOption) {
      dbErrors.push(
        `No poll option found with id ${req.params.poll_option_id}`,
      );
    }

    if (dbErrors.length > 0) {
      res.status(404).send({
        message: dbErrors,
      });
      return;
    }

    const vote = await prisma.vote.create({
      data: {
        pollId: Number(req.params.poll_id),
        pollOptionId: Number(req.params.poll_option_id),
      },
    });

    res.status(201).send(vote);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        console.error(`No poll with id ${req.params.id} found.`);
        res.status(404).send({
          message: `No poll with id ${req.params.id} found.`,
        });
      } else {
        console.error("Prisma encountered an error:", error);
        res.status(500).send({
          message: "Could not get data from the database.",
        });
      }
    } else {
      console.error("Unexpected error:", error);
      res.status(500).send({
        message: "Unexpected error.",
      });
    }
  }
};

export default {
  getActivePoll,
  getActivePollVoteCounts,
  getVotesByPoll,
  postPoll,
  postVote,
};
