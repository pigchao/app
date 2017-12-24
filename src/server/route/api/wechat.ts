import {Router} from 'express';
import {createHash} from "crypto";

function sha1(str) {
	const md5sum = createHash("sha1");
	md5sum.update(str);
	str = md5sum.digest("hex");
	return str;
}

class WechatRouter {

	router:any;
	constructor() {
		this.initRouter()
	}

	validateToken = (req, res) => {
		const query = req.query;
		const signature = query.signature;
		const echostr = query.echostr;
		const timestamp = query.timestamp;
		const nonce = query.nonce;
		const oriArray = [];
		oriArray[0] = nonce;
		oriArray[1] = timestamp;
		oriArray[2] = "lqs6300lqs";
		oriArray.sort();
		const original = oriArray.join('');
		const scyptoString = sha1(original);
		if (signature == scyptoString) {
			res.end(echostr);
			console.log("Confirm and send echo back");
		} else {
			res.end("false");
			console.log("Failed!");
		}
	};

	initRouter() {
		this.router = Router();
		this.router.get('/wechat/validate', (req, res, next) => {
			this.validateToken(req, res);
		})
	}

	getRouter(){
		return this.router;
	}
}
const wechatRouter = new WechatRouter();
export default wechatRouter.getRouter();