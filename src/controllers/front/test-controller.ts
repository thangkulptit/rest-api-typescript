export class TestController {
    public async proc(req, res, next) : Promise<Response> {
        const response = {data: "for test"};
        console.log("im here for test")
        return res.send(response);
    }
}