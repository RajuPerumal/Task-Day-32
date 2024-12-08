// Zen Class Programme - MongoDB Design and Queries

// 1. Collections Schema Design

// Users Collection
db.users.insertMany([
  {
    name: "John Doe",
    email: "john.doe@example.com",
    batch: "B47",
    codekata_problems_solved: 250,
    attendance: [
      { date: "2020-10-15", status: "Present" },
      { date: "2020-10-16", status: "Absent" }
    ],
    tasks: [
      { task_name: "Task1", status: "Submitted", date: "2020-10-15" },
      { task_name: "Task2", status: "Not Submitted", date: "2020-10-20" }
    ],
    mentor_id: ObjectId("mentor_id_1")
  }
]);

// Codekata Collection
db.codekata.insertMany([
  { user_id: ObjectId("user_id_1"), problems_solved: 250 }
]);

// Attendance Collection
db.attendance.insertMany([
  { user_id: ObjectId("user_id_1"), date: "2020-10-15", status: "Absent" }
]);

// Topics Collection
db.topics.insertMany([
  { topic_name: "React Basics", date: "2020-10-18" },
  { topic_name: "NodeJS Intro", date: "2020-10-25" }
]);

// Tasks Collection
db.tasks.insertMany([
  { task_name: "React Component", date: "2020-10-19", submitted_by: [ObjectId("user_id_1"), ObjectId("user_id_2")] }
]);

// Company Drives Collection
db.company_drives.insertMany([
  {
    drive_name: "Google Placement Drive",
    date: "2020-10-20",
    students_appeared: [ObjectId("user_id_1"), ObjectId("user_id_3")]
  },
  {
    drive_name: "Amazon Placement Drive",
    date: "2020-10-28",
    students_appeared: [ObjectId("user_id_2")]
  }
]);

// Mentors Collection
db.mentors.insertMany([
  {
    mentor_name: "Mentor A",
    mentees: [ObjectId("user_id_1"), ObjectId("user_id_2"), ObjectId("user_id_3")],
    mentees_count: 20
  }
]);

// ------------------------------------------------------------

// 2. Queries

// 2.1 Find all the topics and tasks which are taught in the month of October
print("Topics taught in October:");
db.topics.find({ date: { $gte: "2020-10-01", $lte: "2020-10-31" } }).forEach(printjson);

print("Tasks assigned in October:");
db.tasks.find({ date: { $gte: "2020-10-01", $lte: "2020-10-31" } }).forEach(printjson);

// 2.2 Find all the company drives which appeared between 15-Oct-2020 and 31-Oct-2020
print("Company drives between 15-Oct-2020 and 31-Oct-2020:");
db.company_drives.find({ date: { $gte: "2020-10-15", $lte: "2020-10-31" } }).forEach(printjson);

// 2.3 Find all the company drives and students who appeared for the placement
print("Company drives and students appeared for placement:");
db.company_drives.aggregate([
  {
    $project: {
      drive_name: 1,
      date: 1,
      students_appeared: 1
    }
  }
]).forEach(printjson);

// 2.4 Find the number of problems solved by the user in codekata
print("Number of problems solved by each user in Codekata:");
db.codekata.find({}, { user_id: 1, problems_solved: 1, _id: 0 }).forEach(printjson);

// 2.5 Find all the mentors who have mentees count more than 15
print("Mentors with mentees count greater than 15:");
db.mentors.find({ mentees_count: { $gt: 15 } }).forEach(printjson);

// 2.6 Find the number of users who are absent and tasks not submitted between 15-Oct-2020 and 31-Oct-2020
print("Users absent and tasks not submitted between 15-Oct-2020 and 31-Oct-2020:");
db.users.aggregate([
  {
    $match: {
      "attendance.date": { $gte: "2020-10-15", $lte: "2020-10-31" },
      "attendance.status": "Absent",
      "tasks.date": { $gte: "2020-10-15", $lte: "2020-10-31" },
      "tasks.status": "Not Submitted"
    }
  },
  {
    $count: "absent_and_tasks_not_submitted"
  }
]).forEach(printjson);
