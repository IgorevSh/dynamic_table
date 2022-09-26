import TableService from "../services/TableService.js";
class TableController{
   async getRows(req,res,next){
       try {
           const params = req.query
           let result = await TableService.getRows(params)
           return await res.json(result)
       }catch (e){
           console.error(e)
       }
    }
    async  addRow(req,res,next){
        try {
            const params = req.body
            let result = await TableService.addRow(params)
            return await res.json(result)
        }catch (e) {
            console.error(e)
        }
    }
}
export default new TableController()
