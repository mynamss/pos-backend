module.exports = {
    getAllKategori: async (req, res) => {
        try {
            res.send("Sukses")
        } catch (error) {
            console.log(error);
        }
    }
}