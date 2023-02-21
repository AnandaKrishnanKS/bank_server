

  userDetails= {
    1000: { acno: 1000, username: "anu", password: "abc123", balance: 0, transaction: [] },
    1001: { acno: 1001, username: "amal", password: "abc123", balance: 0, transaction: [] },
    1003: { acno: 1003, username: "arun", password: "abc123", balance: 0, transaction: [] },
    1004: { acno: 1004, username: "akhil", password: "abc123", balance: 0, transaction: [] }
  }

register=(uname, acno, psw) =>{
    if (acno in userDetails) {
      return {
        status:false,
        message:'user already exist',
        statusCode:401
      }

    } else {
      userDetails[acno] = { acno, username: uname, password: psw, balance: 0, transaction: [] }
    //   console.log(userDetails);

      return {
        status:true,
        message:'register success',
        statusCode:200
      }
    }
  }

  module.exports={
    register
  }