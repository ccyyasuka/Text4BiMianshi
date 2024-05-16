import os
print(os.getcwd())
import pandas as pd
import matplotlib.pyplot as plt
from cardsTemplates1.iniData import iniData
# 读取Global Superstore的CSV文件
data = pd.read_csv(r'./Datasets/Global Superstore.csv')
def changeDifference(timeSelection):
    data['OrderDate'] = pd.to_datetime(data['OrderDate'])

# 定义时间段
    time11 = timeSelection[0]
    time12 = timeSelection[1]
    time21 = timeSelection[2]
    time22 = timeSelection[3]
    filtered_df_time1 = data[(data['OrderDate'] >= time11) & (data['OrderDate'] <= time12)]
    filtered_df_time2 = data[(data['OrderDate'] >= time21) & (data['OrderDate'] <= time22)]
    sales_sum_time1 = filtered_df_time1['Sales'].sum()
    sales_sum_time2 = filtered_df_time2['Sales'].sum()
    data_export = [
        {"value": sales_sum_time1, "category": "time1"},
        {"value": sales_sum_time2, "category": "time2"},
    ]
    export_json={"data":data_export}


    target=0
    for item in iniData:
        if item["paragraph"][-1]["chartType"] == "TemporalDifference":
            target=item
            break
    # if(data_export[1]["value"]>data_export[0]["value"]):

    # print(target["paragraph"][0]["phrases"][-1]["value"].split(" ")[:-1].join(" "))
    #修改大图数据
    target["paragraph"][-2]["metadata"]["detail"]=data_export
    #修改bullet point
    topics = [paragraph for paragraph in target['paragraph'] if paragraph['type'] == 'normal']
    for i in range(0,len(topics)):
        for phrase in topics[i]['phrases']:
            entity_type = phrase.get('metadata', {}).get('entityType')

            if entity_type is not None and entity_type.startswith("binary_value"):
                if data_export[1]["value"]>data_export[0]["value"]:
                    phrase["value"]="increase"
                    phrase["metadata"]["entityType"]="binary_value_positive"
                else:
                    phrase["value"]="decrease"
                    phrase["metadata"]["entityType"]="binary_value_negative"
                break
        count=0
        for phrase in topics[i]['phrases']:
            entity_type = phrase.get('metadata', {}).get('entityType')
            if entity_type is not None and entity_type.startswith("binary_value") and (count==0):
                if data_export[1]["value"]>data_export[0]["value"]:
                    phrase["value"]="increased "
                    phrase["metadata"]["assessment"]="increase"
                    phrase["metadata"]["entityType"]="binary_value_positive"
                elif data_export[1]["value"]<data_export[0]["value"]:
                    phrase["value"]="decreased "
                    phrase["metadata"]["assessment"]="decrease"
                    phrase["metadata"]["entityType"]="binary_value_negative"
                # print
                # print("aaa阿啊阿啊阿啊阿啊阿啊阿啊")
                print(phrase)
                count+=1
                # phrase["value"]=str(round((data_export[1]["value"]/data_export[0]["value"]-1)*100,2))+"%"
                # if data_export[1]["value"]>data_export[0]["value"]:
                #     phrase["metadata"]["assessment"]="positive"
                # else:
                #     phrase["metadata"]["assessment"]="negative"
            elif entity_type is not None and entity_type.startswith("binary_value")and(count==1):
                
                phrase["value"]=str(round((data_export[1]["value"]/data_export[0]["value"]-1)*100,2))+"%"
                if data_export[1]["value"]>data_export[0]["value"]:
                    phrase["metadata"]["assessment"]="positive"
                    phrase["metadata"]["entityType"]="binary_value_positive"
                else:
                    phrase["metadata"]["assessment"]="negative"
                    phrase["metadata"]["entityType"]="binary_value_negative"
                count+=1
        for phrase in topics[i]['phrases']:
            if phrase.get('metadata', {}).get('entityType') == 'insight':             
                phrase["value"]="("+str(round(data_export[0]["value"],2))+" → "+str(round(data_export[1]["value"],2))+")"
                phrase["metadata"]["detail"]=data_export
    print(data_export)
    return iniData

