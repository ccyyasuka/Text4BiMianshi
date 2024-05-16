import os
print(os.getcwd())
import pandas as pd
import matplotlib.pyplot as plt
from cardsTemplates1.iniData import iniData
import numpy as np
# 读取Global Superstore的CSV文件
data = pd.read_csv(r'./Datasets/Global Superstore.csv')
def calculate_outliers(data):
    q1 = np.percentile(data, 25)
    q3 = np.percentile(data, 75)
    iqr = q3 - q1
    lower_bound = q1 - (1.5 * iqr)
    upper_bound = q3 + (1.5 * iqr)
    outliers = data[(data < lower_bound) | (data > upper_bound)]
    return len(outliers)
def changeDistribution(timeSelection):
    grouped_data = data[(data['OrderDate'] >= timeSelection[0]) & (data['OrderDate'] <= timeSelection[1])].groupby('OrderDate').sum()

    data_export = [{"category": "none", "value": row.Sales} for _, row in grouped_data.iterrows()]
    # 组合最终的JSON对象
    export_json = {"data": data_export}
    
    max_value = np.max(grouped_data['Sales']).astype(float).round(2)
    min_value = np.min(grouped_data['Sales']).astype(float).round(2)
    mean_value = np.mean(grouped_data['Sales']).astype(float).round(2)
    median_value = np.median(grouped_data['Sales']).astype(float).round(2)
    quantiles = np.percentile(grouped_data['Sales'], [25, 50, 75])
    variance = np.std(grouped_data['Sales']).astype(float).round(2)
    outliers = calculate_outliers(grouped_data['Sales'])
    
    target=0
    for item in iniData:
        if item["paragraph"][-1]["chartType"] == "Distribution":
            target=item
            break
    # print(target)
    # print(target["paragraph"][0]["phrases"][-1]["value"].split(" ")[:-1].join(" "))
    #修改大图数据
    target["paragraph"][-2]["metadata"]["detail"]=data_export
    #修改bullet point
    topics = [paragraph for paragraph in target['paragraph'] if paragraph['type'] == 'normal']
    count=0
    for phrase in topics[0]['phrases']:
        
        if phrase.get('metadata', {}).get('entityType') == 'metric_value':
            if count==0:
                phrase["metadata"]["origin"]=min_value
                phrase["value"]=str(min_value)
            if count==1:
                phrase["metadata"]["origin"]=max_value
                phrase["value"]=str(max_value)
            if count==2:
                phrase["metadata"]["origin"]=outliers
                phrase["value"]=str(outliers)
            count+=1
    topics = [paragraph for paragraph in target['paragraph'] if paragraph['type'] == 'bullet']
    count=0
    for phrase in topics[0]['phrases']:
        if phrase.get('metadata', {}).get('entityType') == 'metric_value':
            if count==0:
                phrase["metadata"]["origin"]=min_value
                phrase["value"]=str(min_value)
            if count==1:
                phrase["metadata"]["origin"]=max_value
                phrase["value"]=str(max_value)
            count+=1
    count=0
    for phrase in topics[1]['phrases']:
        if phrase.get('metadata', {}).get('entityType') == 'metric_value':
            if count==0:
                phrase["metadata"]["origin"]=quantiles[0].astype(float).round(2)
                phrase["value"]=str(quantiles[0].astype(float).round(2))
            if count==1:
                phrase["metadata"]["origin"]=quantiles[1].astype(float).round(2)
                phrase["value"]=str(quantiles[1].astype(float).round(2))
            if count==2:
                phrase["metadata"]["origin"]=quantiles[2].astype(float).round(2)
                phrase["value"]=str(quantiles[2].astype(float).round(2))
            count+=1
    count=0
    # for phrase in topics[2]['phrases']:
    #     if phrase.get('metadata', {}).get('entityType') == 'metric_value':
    #         if count==0:
    #             phrase["metadata"]["origin"]=mean_value
    #             phrase["value"]=str(mean_value)
    #         count+=1
    #     if phrase.get('metadata', {}).get('entityType') == 'insight':
    #         phrase["value"]=str(variance)
    #         phrase["metadata"]["detail"]=data_export

    # print(target)

    return iniData

