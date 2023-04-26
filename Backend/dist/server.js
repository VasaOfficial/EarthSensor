import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
dotenv.config();
const PORT = 8000;
const app = express();
app.use(cors());
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
//# sourceMappingURL=server.js.map