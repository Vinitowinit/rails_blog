class Article < ApplicationRecord
    validates :title, presence:true 
    validates :abstract, presence:true
    validates :body, presence:true
end
