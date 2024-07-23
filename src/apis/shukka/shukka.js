import instances from "../axios";
export const get_nouhinsaki = async () => {
     let res = await instances.get("nouhinsaki/get-list")
     console.log(res.data.data);
     return res.data.data;
}