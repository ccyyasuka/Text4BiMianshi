import os
print(os.getcwd())
import pandas as pd
import matplotlib.pyplot as plt
from cardsTemplates1.iniData import iniData
from cardsTemplates1.AnomalyData import AnomalyData
import copy
# 读取Global Superstore的CSV文件
data = pd.read_csv(r'./Datasets/Global Superstore.csv')
def changeTemporalAnomaly(timeSegmentationCondition):
    new_data=copy.deepcopy(AnomalyData)
    timeSeg=0
    filtered_data=[]

    if timeSegmentationCondition=="365 days":
        filtered_data = [entry for entry in new_data["data"] if entry["date"] < "2012-01-01"]
        timeSeg=365
    if timeSegmentationCondition=="30 days":
        filtered_data = [entry for entry in new_data["data"] if entry["date"] > "2011-12-01"]
        timeSeg=30
    if timeSegmentationCondition=="7 days":
        filtered_data = [entry for entry in new_data["data"] if entry["date"] > "2011-12-23"]
        timeSeg=7
    new_data["data"]=filtered_data
    abnormal_data = [item for item in filtered_data if item["category"] == "abnormal"]
    



    target=0
    for item in iniData:
        if item["paragraph"][-1]["chartType"] == "TemporalAnomaly":
            target=item
            break
    print("****************************************************target1****************************************************")
    print(abnormal_data)
    print("****************************************************target1****************************************************")
    # print(target["paragraph"][0]["phrases"][-1]["value"].split(" ")[:-1].join(" "))
    #修改大图数据
    target["paragraph"][-2]["metadata"]["detail"]=new_data["data"]
    #修改bullet point
    topics = [paragraph for paragraph in target['paragraph'] if paragraph['type'] == 'normal']
    for i in range(0,len(topics)):
        for phrase in topics[i]['phrases']:
            if phrase.get('metadata', {}).get('entityType') == 'binary_value_positive':
                phrase["value"]=len(abnormal_data)
                break
        for phrase in topics[i]['phrases']:
            if phrase.get('metadata', {}).get('entityType') == 'insight':
                phrase["metadata"]["detail"]=new_data["data"]
                break
        for phrase in topics[i]['phrases']:
            if phrase.get('metadata', {}).get('entityType') == 'metric_value':
                phrase["metadata"]["origin"]=timeSeg
                phrase["value"]=str(timeSeg)+" "
                break
    topics = [paragraph for paragraph in target['paragraph'] if paragraph['type'] == 'bullet']
    for i in range(0,len(topics)):
        if(i>=len(abnormal_data)):
            topics[i]['show']="no"
            continue
        topics[i]['show']="yes"
        # print(topics[i])
        topics[i]["phrases"][1]["value"]=abnormal_data[i]["date"]
        for phrase in topics[i]['phrases']:
            if phrase.get('metadata', {}).get('entityType') == 'metric_value':
                phrase["value"]=str(round(abnormal_data[i]["value"],2))
                phrase["metadata"]["origin"]=round(abnormal_data[i]["value"],2)
                break
        for phrase in topics[i]['phrases']:
            if phrase.get('metadata', {}).get('entityType') == 'binary_value_positive':
                phrase["value"]=str(round(abnormal_data[i]["predict"],2))
                phrase["metadata"]["origin"]=round(abnormal_data[i]["predict"],2)
                break
    print("****************************************************target2****************************************************")
    print(target)
    print("****************************************************target2****************************************************")

    
    # for item in data:
    #     if item["paragraph"][-1]["chartType"] == "Proportion":
    #         item=target
    #         break
    return iniData

