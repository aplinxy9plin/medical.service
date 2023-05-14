import { Injectable } from '@nestjs/common';
import { Payload } from 'src/types/payload';
import { sign } from 'jsonwebtoken';
import { UserService } from 'src/user/user.service';
import { InjectModel } from '@nestjs/mongoose';
import { IReportType, ReportsCreateDTO } from './reports.dto';
import { Model } from 'mongoose';
import { ReportsSchema } from 'src/models/reports.schema';
import { defaultSchema } from 'src/shared/defaultSchema';
import mongoose from 'mongoose';
import axios from 'axios'

@Injectable()
export class ReportsService {
  constructor(@InjectModel('Reports') private reportsModel: Model<IReportType>) {}

  async getSchema(version?: string): Promise<IReportType> {
    let schema = await this.reportsModel.findOne(version ? { reportVersion: version } : {}, {}, { sort: { 'createdAt' : -1 } })
    if(!schema){
      schema = await this.reportsModel.create({
        report: defaultSchema,
        reportVersion: 1,
      })
    }
    return schema;
  }

  async updateSchema(dto: ReportsCreateDTO): Promise<IReportType> {
    const lastSchema = await this.reportsModel.findOne({}, {}, { sort: {'createdAt' : -1} })
    let version = 1;
    if(lastSchema){
      version = lastSchema.reportVersion + 1
    }
    const newSchema = await this.reportsModel.create({
      report: dto.report.map((item) => ({ ...item, id: item.id === "null" ? new mongoose.Types.ObjectId() : new mongoose.Types.ObjectId(item.id) })),
      reportVersion: version,
    })
    // const schema = await this.reportsModel.create(dto.report);
    return newSchema;
  }

  async getFullSchema() {
    const schemas = await this.reportsModel.find()
    const reports = schemas.map((item) => item.report).map(item => item.concat()).flat(1).map(item => ({...item, id: String(item.id)}));
    return [...new Map(reports.map(item =>
      [item.id, item])).values()]
  }

  async autoComplete(value: string) {
    let data = JSON.stringify({
      "roomId": 1003,
      "uuid": 1684008266080,
      "regenerate": false,
      // TODO: generate string here
      "prompt": value,
      "options": {},
      "systemMessage": "You are ChatGPT, a large language model trained by OpenAI. Follow the user instructions carefully. Respond using markdown.",
      "temperature": 0.8,
      "top_p": 1
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: process.env.CHAT_GPT_URL,
      headers: { 
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.4 Safari/605.1.15', 
        'Cookie': '__cf_bm=FekA69T8ketD5kHd8i0Sjs5n4upXFOEYi2UwDjOz1aM-1684007371-0-AeHXse2BNOvaV0bAJtKjNFzwRph61PnvvX5YGgh2AGLDJQxVhiRy+GXJ27q358k7NXNo+qGiPrZQXfVmfT67VxjmmOH+AfngMKzJla/nFCde; __gads=ID=68ef35d186f227fa-223baeb6d3dd0089:T=1684007368:RT=1684007368:S=ALNI_MZvxBoZXf0DPhTBntS7mficNC71XA; __gpi=UID=00000c15674f5f09:T=1684007368:RT=1684007368:S=ALNI_ManBJZKKFJe_b0bfGwqsF3zDEDsPw; _ga=GA1.1.179669107.1684007368; _ga_0MN0L0RJXZ=GS1.1.1684007368.1.0.1684007368.0.0.0', 
        'Content-Type': 'application/json'
      },
      data : data
    };
    const text = (await axios.request(config)).data
    return text.split('text":"')[text.split('text":"').length-1].split('","')[0]

  }

}
