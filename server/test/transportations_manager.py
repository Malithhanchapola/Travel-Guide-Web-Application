import numpy as np
import pandas as pd
import os
import math


class TransportationManager():
    def __init__(self):
        # get the path of current directory        
        self.root_folder_path = os.path.dirname(__file__)

        # read locations data
        dataset_file_path = self.root_folder_path + '/Transportations/Transportations.csv'
        self.df_transportations = pd.read_csv(dataset_file_path, index_col="id")
    
    def getTransportations(self, loc):
        district = loc[2]

        return self.df_transportations[self.df_transportations.District == district]
