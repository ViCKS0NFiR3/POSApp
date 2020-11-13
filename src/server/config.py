from configparser import ConfigParser

# filename='database.ini', section='postgresql'
def config(filename, section):
    # create a parser
    parser = ConfigParser()
    # read config file
    parser.read(filename)
    # get section, default to postgresql
    data = {}
    if parser.has_section(section):
        params = parser.items(section)
        for param in params:
            data[param[0]] = param[1]
    else:
        raise Exception('Section {0} not found in the {1} file'.format(section, filename))
    return data

def addReceiptNo(filename, section, item):
    print("Add 1 to receipt Number")
    parser = ConfigParser()
    parser.read(filename)
    receipt_id = parser.get(section,item)
    parser.set(section,item, str(int(receipt_id) + 1))
    return {"Receipt_ID": parser.get(section,item)}

posDbConfig = config("posConfig.ini","posDb")
posAppConfig = config("posConfig.ini","posApp")




