module.exports = {
  DG_user:{
    count: "SELECT COUNT(user_id) as cnt FROM DG_user ",
    insert: "INSERT INTO DG_user (?) VLAUES (?)",
    update: "UPDATE DG_user SET ",
    list: "SElECT ?? FROM DG_user "
  },
  DG_mission:{
    insert: "INSERT INTO DG_mission SET ? ",//{username:'hello'}
    update: "UPDATE DG_mission SET ? ",//{username:'hello'}
    list: "SELECT ?? FROM DG_mission "
  },
  DG_tutorial:{
    insert: "INSERT INTO DG_tutorial SET ? ",//{username:'hello'}
    update: "UPDATE DG_tutorial SET ? ",//{username:'hello'}
    list: "SELECT ?? FROM DG_tutorial "
  },
  DG_work:{
    insert: "INSERT INTO DG_work SET ? ",//{username:'hello'}
    update: "UPDATE DG_work SET ? ",//{username:'hello'}
    list: "SELECT ?? FROM DG_work "
  },
  DGvw_newWork:{
    list: "SELECT DGvw_newWork.work_id, DGvw_newWork.course_id, DGvw_newWork.mission_id, DGvw_newWork.title, DGvw_newWork.img, DGvw_newWork.message, DGvw_newWork.user_id, DGvw_newWork.nickname, DGvw_newWork.avatar, DGvw_newWork.createtime FROM DGvw_newWork"
  },
  DGvw_pastWork:{
    list:"SELECT DGvw_pastWork.img, DGvw_pastWork.message, DGvw_pastWork.rank, DGvw_pastWork.answer, DGvw_pastWork.createtime FROM DGvw_pastWork WHERE DGvw_pastWork.user_id = ?"
  },
  DG_rating:{
    insert: "INSERT INTO DG_rating SET ? ",//{username:'hello'}
  },
  DGrlt_rating_tutorial:{
    insert: "INSERT INTO DGrlt_rating_tutorial SET ? ",//{username:'hello'}
    del: "DELETE FROM DGrlt_rating_tutorial",//{username:'hello'}
  },
  DG_user:{
    list:"SELECT ?? FROM DG_user "
  },
  DGvw_userMission:{
    list:"SELECT ?? FROM DGvw_userMission "
  },
  DG_missionLine:{
    del: "DELETE FROM DG_missionLine ",//{username:'hello'}
    insert: "INSERT INTO DG_missionLine SET ? ",//{username:'hello'}
  }
};