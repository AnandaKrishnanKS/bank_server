const jwt = require('jsonwebtoken')

userDetails = {
  1000: { acno: 1000, username: "anu", password: "abc123", balance: 0, transaction: [] },
  1001: { acno: 1001, username: "amal", password: "abc123", balance: 0, transaction: [] },
  1003: { acno: 1003, username: "arun", password: "abc123", balance: 0, transaction: [] },
  1004: { acno: 1004, username: "akhil", password: "abc123", balance: 0, transaction: [] }
}

register = (uname, acno, psw) => {
  if (acno in userDetails) {
    return {
      status: false,
      message: 'user already exist',
      statusCode: 401
    }

  } else {
    userDetails[acno] = { acno, username: uname, password: psw, balance: 0, transaction: [] }
    //   console.log(userDetails);

    return {
      status: true,
      message: 'register success',
      statusCode: 200
    }
  }
}

login = (acno, psw) => {

  if (acno in userDetails) {
    if (psw == userDetails[acno]["password"]) {
      currentUser = userDetails[acno]["username"]
      currentAcno = acno

      const token = jwt.sign({ currentAcno }, "superkey123")

      return {
        status: true,
        message: 'login success',
        statusCode: 200,
        currentUser,
        currentAcno,
        token

      }

    } else {
      return {
        status: false,
        message: 'incorrect password',
        statusCode: 401
      }
    }
  } else {
    return {
      status: false,
      message: 'incorrect account number',
      statusCode: 401
    }
  }

}

deposit = (acnum, password, amount) => {
  //to convert string into number
  var amnt = parseInt(amount)
  if (acnum in userDetails) {
    if (password == userDetails[acnum]["password"]) {
      //update balace
      userDetails[acnum]["balance"] += amnt

      //transaction data storage
      userDetails[acnum]["transaction"].push({ Type: "Credit", amount: amnt })


      //return balance
      return {
        status: true,
        message: `${amnt} has been credited , current balance is ${userDetails[acnum]["balance"]}`,
        statusCode: 200
      }



    } else {
      return {
        status: false,
        message: 'incorrect password',
        statusCode: 401
      }
    }
  } else {
    return {
      status: false,
      message: 'incorrect account number',
      statusCode: 401
    }
  }
}

withdraw = (acnum, password, amount) => {

  //to convert string into number
  var amnt = parseInt(amount)
  if (acnum in userDetails) {
    if (password == userDetails[acnum]["password"]) {

      if (amnt <= userDetails[acnum]["balance"]) {
        //update balace
        userDetails[acnum]["balance"] -= amnt

        //transaction data storage
        userDetails[acnum]["transaction"].push({ Type: "Debit", amount: amnt })

        //return balance
        return {
          status: true,
          message: `${amnt} has been debited , current balance is ${userDetails[acnum]["balance"]}`,
          statusCode: 200
        }
      } else {
        return {
          status: false,
          message: 'insufficient balance',
          statusCode: 401
        }
      }

    } else {
      return {
        status: false,
        message: 'incorrect password',
        statusCode: 401
      }
    }
  } else {
    return {
      status: false,
      message: 'incorrect account number',
      statusCode: 401
    }
  }
}

getTransaction = (acno) => {

  return {
    status: true,
    statusCode: 200,
    transaction: userDetails[acno]["transaction"]
  }


}

module.exports = {
  register,
  login,
  deposit,
  withdraw,
  getTransaction
}