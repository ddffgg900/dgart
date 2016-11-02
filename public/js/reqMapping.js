var host = "http://" + location.hostname+":3000";
var reqMapping = {
  control:{
    listMission: host + "/control/listMission",
    addMission: host + "/control/addMission",
    missionUploadFile: host + "/control/missionUploadFile",
    tutorialUploadFile: host + "/control/tutorialUploadFile",
    listTutorial: host + "/control/listTutorial",
    listNewWork: host + "/control/listNewWork",
    addRating: host + "/control/addRating",
    listPastWork: host + "/control/listPastWork",
    listUser: host + "/control/listUser",
    listUserMission: host + "/control/listUserMission",
    setMissionLine: host + "/control/setMissionLine"
  },
  common:{
    checkLogin: host + "/control/checkLogin"
  }
}