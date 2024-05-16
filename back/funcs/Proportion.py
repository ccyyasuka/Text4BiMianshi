import os
print(os.getcwd())
import pandas as pd
import matplotlib.pyplot as plt
from cardsTemplates1.iniData import iniData
# 读取Global Superstore的CSV文件
data = pd.read_csv(r'./Datasets/Global Superstore.csv')
def changeProportion(timeSelection,drillDownGroup):
    data['OrderDate'] = pd.to_datetime(data['OrderDate'])
    grouped_by_country = data[(data['OrderDate'] >= timeSelection[0]) & (data['OrderDate'] <= timeSelection[1])].groupby(drillDownGroup)['Sales'].sum().reset_index().sort_values(by='Sales', ascending=False)
    total_sales = grouped_by_country['Sales'].sum()
    grouped_by_country['Proportion'] = (grouped_by_country['Sales'] / total_sales).round(4)
    data_export = [{"category": row[drillDownGroup], "value": row.Proportion} for _, row in grouped_by_country.iterrows()][:10]
    # 组合最终的JSON对象
    export_json = {"data": data_export}
    print(export_json)

    target=0
    for item in iniData:
        if item["paragraph"][-1]["chartType"] == "Proportion":
            target=item
            break
    #修改题目
    target["paragraph"][0]["phrases"][-1]["value"]=" ".join(target["paragraph"][0]["phrases"][-1]["value"].split(" ")[:-1])+" "+drillDownGroup
    # print(target["paragraph"][0]["phrases"][-1]["value"].split(" ")[:-1].join(" "))
    #修改大图数据
    target["paragraph"][-2]["metadata"]["detail"]=data_export
    #修改bullet point
    topics = [paragraph for paragraph in target['paragraph'] if paragraph['type'] == 'bullet']
    for i in range(0,len(topics)):
        for phrase in topics[i]['phrases']:
            if phrase.get('metadata', {}).get('entityType') == 'metric_names':
                phrase["value"]=export_json["data"][i]["category"]
                break
        for phrase in topics[i]['phrases']:
            if phrase.get('metadata', {}).get('entityType') == 'metric_value':
                phrase["value"]=str(round(export_json["data"][i]["value"]*100,2))+"%"
                phrase["metadata"]["origin"]=export_json["data"][i]["value"]
                
                phrase["metadata"]["detail"]=[export_json["data"][i]["value"],1-export_json["data"][i]["value"]]
                break

    
    # for item in data:
    #     if item["paragraph"][-1]["chartType"] == "Proportion":
    #         item=target
    #         break
    return iniData

