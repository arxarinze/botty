const axios = require("axios");
const authService = async (tokenReq) => {
    try {
        const token = tokenReq;
        const url = `${process.env.AUTH_URL}${token}/verify`;
        const res = await axios.default.get(url);
        if (res.status == 200) {
            const email = res.data["email"];
            return { status: true, email, message: "OK" };
        } else {
            const message = res.data["error"];
            return { status: false, email: "", message };
        }
    } catch (error) {
        try {
            return { status: false, email: "", message: error.response.data.error };
        } catch (error) {
            return { status: false, email: "", message: "Unauthorized" };
        }
    }
}

module.exports = authService;