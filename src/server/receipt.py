from config import posAppConfig
from datetime import datetime
from tabulate import tabulate

def createReceipt(items, receiptId, totalPrice, totalPay, totalChange):
    itemList = ""
    priceList = []
    print("Creating Receipt")
    for item in items:
        itemList = itemList + ' %-6s%-29s%-12s\n' % (item[3], item[2], item[4])
        priceList.append(item[4])
    print("Creating Receipt")
    header = """
            XYZ CORPORATION             
        2472 M. Dela Cruz St. 
                Pasay City

            {:%Y-%m-%d %H:%M:%S}
            THANKS FOR SHOPPING 
                                    {}
==========================================
 QTY  ITEMS                         PRICE
{}
 SUBTOTAL                           {}
 CASH                               {}
 CHANGE                             {}
""".format(datetime.now(),itemList, receiptId, totalPrice, totalPay, totalChange)
    note = """
    {:%Y-%m-%d %H:%M:%S}
    """.format(datetime.now())
    print(note)
