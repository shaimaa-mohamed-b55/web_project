async function seedFeed(name, items) {
  try {
    const existing = await prisma.post.findMany();
    if (existing.length > 0) {
      console.log(`Skipped ${name} - already has ${existing.length} rows`);
      return;
    }

    for (const item of items) {
      const postAuthor = await prisma.user.findUnique({
        where: { username: item.username },
      });

      if (!postAuthor) continue;

      const validLikes = [];

      for (const likeUser of item.likes || []) {
        const liker = await prisma.user.findUnique({
          where: { username: likeUser },
        });

        if (liker) {
          validLikes.push({
            userId: liker.id,
            postId: undefined, 
          });
        }
      }

      const commentsData = [];

      for (const c of item.comments || []) {
        const commentAuthor = await prisma.user.findUnique({
          where: { username: c.username },
        });

        commentsData.push({
          comment: c.text,
          username: c.username,
          createdAt: new Date(), 
          author: {
            connect: { id: commentAuthor?.id || postAuthor.id },
          },
        });
      }

      await prisma.post.create({
        data: {
          text: item.text,
          createdAt: new Date(item.createdAt.replace(" ", "T")),
          author: {
            connect: { id: postAuthor.id },
          },

          comments: {
            create: commentsData,
          },

          likes: {
            create: item.likes?.map((username) => ({
              user: {
                connect: {
                  username,
                },
              },
            })),
          },
        },
      });
    }

    console.log(`Successfully seeded posts, comments, and likes!`);
  } catch (e) {
    console.error(`Error in seedFeed: ${e.message}`);
  }
}