import pandas as pd
import matplotlib.pyplot as plt
import json
from datetime import datetime
import numpy as np


# 绘制散点图
def calculate_outliers(data):
    q1 = np.percentile(data, 25)
    q3 = np.percentile(data, 75)
    iqr = q3 - q1
    lower_bound = q1 - (1.5 * iqr)
    upper_bound = q3 + (1.5 * iqr)
    outliers = data[(data < lower_bound) | (data > upper_bound)]
    return outliers
def get_distribution_data(start_time,end_time):
    final_res={}
    data = pd.read_csv('./Datasets/Global Superstore.csv')
    data['OrderDate'] = pd.to_datetime(data['OrderDate'])
    data = data[(data['OrderDate'] >= start_time) & (data['OrderDate'] <= end_time)]
    grouped_data = data.groupby('OrderDate').sum()
    #计算绘图用数据
    data_export = [{"category": "none", "value": row.Sales} for _, row in grouped_data.iterrows()]
    final_res["all_data"]={"data":data_export}
    

    skewness_value = grouped_data['Sales'].skew()
    if skewness_value > 0:
        skewness="right-skewed"
    elif skewness_value <= 0:
        skewness="left-skewed"
    max_value = np.max(grouped_data['Sales'])
    min_value = np.min(grouped_data['Sales'])
    mean_value = np.mean(grouped_data['Sales'])
    median_value = np.median(grouped_data['Sales'])
    quantiles = np.percentile(grouped_data['Sales'], [25, 50, 75])
    variance = np.std(grouped_data['Sales'])
    outliers = calculate_outliers(grouped_data['Sales']).size
    final_res["skewness"]=skewness
    final_res["outliers"]=outliers
    final_res["min_value"]=min_value
    final_res["max_value"]=max_value
    final_res["Q1"]=quantiles[0]
    final_res["Q2"]=quantiles[1]
    final_res["Q3"]=quantiles[2]
    final_res["mean_value"]=mean_value
    final_res["variance"]=variance
    return final_res

    

   

