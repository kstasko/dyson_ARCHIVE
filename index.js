exports.handler =  async (event) => {
    console.log("working!!")
    return {statusCode: 200, body: JSON.stringify("Hello from AWS")}
  }
