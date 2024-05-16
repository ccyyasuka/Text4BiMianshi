from flask import Flask, jsonify, request
from flask_cors import CORS
import json

from cardsTemplates1.iniData import iniData
from funcs.Proportion import changeProportion
from funcs.Distribution import changeDistribution
from funcs.Categorization import changeCategorization
from funcs.Difference import changeDifference
from funcs.TemporalTrend import changeTemporalTrend
from funcs.TemporalPeriodly import changeTemporalPeriodly
from utils.getDistributionData import get_distribution_data
from funcs.TemporalAnomaly import changeTemporalAnomaly
# from github import Github # 导入GitHub库

app = Flask(__name__)
CORS(app)  # 允许跨域请求
# # 配置GitHub OAuth Token
# github_token = '你的GitHub Token'
# g = Github(github_token)

@app.route('/hello')
def hello_world():
    return jsonify({'message': 'Hello, from Flask!'})


# @app.route('/distribution', methods=['POST'])
# def get_distribution_data():
#     print("start distribution")
#     data = request.json  
#     start_time = data.get('startTime')
#     end_time = data.get('endTime')
#     # get_distribution_data(start_time,end_time)
#     with open('./cardsTemplates/Cards1.json', 'r') as file:
#         # 加载JSON数据
#         data = json.load(file)
#     print("get data")
#     return jsonify(data)
@app.route('/Categorization', methods=['POST'])
def get_categorization_data():
    data = request.json  
    drillDownGroup = data.get('drillDownGroup')
    chartType=data.get("chartType")
    topK=data.get("topK")
    print(drillDownGroup)
    res = changeCategorization(drillDownGroup,topK)
    print("get data")
    return jsonify(res)
@app.route('/Distribution', methods=['POST'])
def get_distribution_data():
    print("start Distribution")
    data = request.json  
    timeSelection = data.get('timeSelection')
    print(timeSelection)
    # get_distribution_data(start_time,end_time)
    # with open('./cardsTemplates/Cards2.json', 'r') as file:
    #     # 加载JSON数据
    #     data = json.load(file)
    res = changeDistribution(timeSelection)
    print("get data")
    return jsonify(res)
@app.route('/TemporalDifference', methods=['POST'])
def get_difference_data():
    print("start Distribution")
    data = request.json  
    timeSelection = data.get('timeSelection')
    print(timeSelection)
    # get_distribution_data(start_time,end_time)
    # with open('./cardsTemplates/Cards2.json', 'r') as file:
    #     # 加载JSON数据
    #     data = json.load(file)
    res = changeDifference(timeSelection)
    print("get data")
    return jsonify(res)
@app.route('/Proportion', methods=['POST'])
def get_proportion_data():
    print("start Proportion")
    data = request.json  
    timeSelection = data.get('timeSelection')
    drillDownGroup = data.get('drillDownGroup')
    chartType=data.get("chartType")
    print(timeSelection)
    print(drillDownGroup)
    # get_distribution_data(start_time,end_time)
    # with open('./cardsTemplates/Cards2.json', 'r') as file:
    #     # 加载JSON数据
    #     data = json.load(file)
    res = changeProportion(timeSelection,drillDownGroup)
    print("get data")
    return jsonify(res)

@app.route('/TemporalPeriodicity', methods=['POST'])
def get_TemporalPeriodly_data():
    data = request.json  
    timeSegmentationCondition = data.get('timeSegmentationCondition')
    chartType=data.get("chartType")
    topK=data.get("topK")
    print(timeSegmentationCondition)
    # get_distribution_data(start_time,end_time)
    # with open('./cardsTemplates/Cards2.json', 'r') as file:
    #     # 加载JSON数据
    #     data = json.load(file)
    res = changeTemporalPeriodly(timeSegmentationCondition)
    print("get data")
    return jsonify(res)

@app.route('/TemporalTrend', methods=['POST'])
def get_TemporalTrend_data():
    data = request.json  
    timeSegmentationCondition = data.get('timeSegmentationCondition')
    timeSelection = data.get('timeSelection')
    chartType=data.get("chartType")
    print(timeSegmentationCondition)
    print(timeSelection)
    # get_distribution_data(start_time,end_time)
    # with open('./cardsTemplates/Cards2.json', 'r') as file:
    #     # 加载JSON数据
    #     data = json.load(file)
    res = changeTemporalTrend(timeSegmentationCondition,timeSelection)
    print("get data")
    return jsonify(res)

@app.route('/TemporalAnomaly', methods=['POST'])
def get_TemporalAnomaly_data():
    data = request.json  
    timeSegmentationCondition = data.get('timeSegmentationCondition')
    chartType=data.get("chartType")
    print(timeSegmentationCondition)
    # get_distribution_data(start_time,end_time)
    # with open('./cardsTemplates/Cards2.json', 'r') as file:
    #     # 加载JSON数据
    #     data = json.load(file)
    res = changeTemporalAnomaly(timeSegmentationCondition)
    print("get data")
    return jsonify(res)

@app.route('/saveInitialSettings', methods=['POST'])
def save_initial_settings_data():
    print("start saving InitialSettings")
    initial_settings_data = request.json  # 获取前端发送的JSON数据

    # 将接收到的设置存储到本地文件中
    with open('initialSettings.json', 'w') as file:  # 打开（或创建）一个名为'settings.json'的文件
        json.dump(initial_settings_data, file)  # 将settings_data写入文件    
    # # 这里为了确认数据被正确处理，我们从文件中读取数据然后返回，也可以直接返回接收到的数据
    # with open('initialSettings.json', 'r') as file:
    #     saved_data = json.load(file)  # 从文件中读取数据
    return jsonify('', 200)  # 返回一个空的响应和200状态码

@app.route('/saveModifiedSettings', methods=['POST'])
def save_modified_settings_data():
    print("start saving modifiedSettings")
    modified_settings_data = request.json  # 获取前端发送的JSON数据
    # print("get data", settings_data)
    
    # 将接收到的设置存储到本地文件中
    with open('modifiedSettings.json', 'w') as file:  # 打开（或创建）一个名为'settings.json'的文件
        json.dump(modified_settings_data, file)  # 将settings_data写入文件 
    # # 这里为了确认数据被正确处理，我们从文件中读取数据然后返回，也可以直接返回接收到的数据
    # with open('settings.json', 'r') as file:
    #     saved_data = json.load(file)  # 从文件中读取数据
    return jsonify(modified_settings_data)  # 返回一个空的响应和200状态码

@app.route('/getSettings', methods=['GET'])
def get_settings_data():
    print("start getSettings")
    
    # 尝试打开并读取 settings.json 文件的内容
    try:
        with open('settings.json', 'r') as file:
            settings_data = json.load(file)
    except FileNotFoundError:
        # 如果文件不存在，返回一个空字典或者预定义的错误消息
        settings_data = {"error": "Settings file not found."}
    
    return jsonify(settings_data)

def find_differences(initial, modified):
    """
    递归比较两个字典，返回存在于modified中但不在initial中的项，
    或者值有变化的项。
    """
    changes = {}
    for key, value in modified.items():
        if isinstance(value, dict):
            nested_changes = find_differences(initial.get(key, {}), value)
            if nested_changes:
                changes[key] = nested_changes
        elif key not in initial or initial[key] != value:
            changes[key] = value
    return changes

@app.route('/getChangedSettings', methods=['GET'])
def get_changed_settings():
    try:
        with open('initialSettings.json', 'r') as file:
            initial_settings = json.load(file)
        with open('modifiedSettings.json', 'r') as file:
            modified_settings = json.load(file)
    except FileNotFoundError as e:
        return jsonify({"error": str(e)})

    # 比较设置并找出差异
    changed_settings = find_differences(initial_settings, modified_settings)

    # 如果有差异，则将差异保存到新文件
    if changed_settings:
        with open('changedSettings.json', 'w') as file:
            json.dump(changed_settings, file)
        return jsonify(changed_settings)
    else:
        return jsonify({"message": "No changes detected."})

if __name__ == '__main__':
    app.run(debug=True)


