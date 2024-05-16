import json

# 将这个路径替换成你的 JSON 文件的实际路径
file_path = 'back/cardsTemplate/Cards1.json'
file_path2 = 'cardsTemplate/Cards2.json'

# 读取 JSON 数据
with open(file_path, 'r', encoding='utf-8') as file:
    data = json.load(file)

# 重新保存 JSON 数据，确保所有键都加上了双引号
with open(file_path2, 'w', encoding='utf-8') as file:
    json.dump(data, file, indent=4, ensure_ascii=False)
