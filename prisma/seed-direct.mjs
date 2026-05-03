import Database from "better-sqlite3";

const db = new Database("./prisma/dev.db");

db.exec(`
    INSERT INTO User (username, firstname, lastname, email, password) VALUES
      ('ahmed_99', 'Ahmed', 'Ali', 'ahmed@example.com', 'pass123'),
      ('sara_dev', 'Sara', 'Dev', 'sara@example.com', 'pass123'),
      ('omar_tech', 'Omar', 'Tech', 'omar@example.com', 'pass123'),
      ('layla_m', 'Layla', 'M', 'layla@example.com', 'pass123'),
      ('faisal_a', 'Faisal', 'A', 'faisal@example.com', 'pass123')
`);

const users = db.prepare("SELECT id, username FROM User").all();
console.log("Users inserted:", users);

users.forEach(u => {
    db.prepare("INSERT INTO Profile (bio, userId) VALUES (?, ?)").run("Hi I am " + u.username, u.id);
});

db.prepare("INSERT INTO Post (text, authorId) VALUES (?, ?)").run("Exploring the city today!", users[0].id);
db.prepare("INSERT INTO Post (text, authorId) VALUES (?, ?)").run("Just finished a mystery novel!", users[1].id);
db.prepare("INSERT INTO Post (text, authorId) VALUES (?, ?)").run("Morning run clears the head.", users[2].id);

const posts = db.prepare("SELECT id FROM Post").all();

db.prepare("INSERT INTO Comment (comment, username, authorId, postId) VALUES (?, ?, ?, ?)").run("Great photo!", users[1].username, users[1].id, posts[0].id);
db.prepare("INSERT INTO Like (userId, postId) VALUES (?, ?)").run(users[1].id, posts[0].id);
db.prepare("INSERT INTO Like (userId, postId) VALUES (?, ?)").run(users[2].id, posts[1].id);

console.log("✅ Done! Database seeded.");
db.close();