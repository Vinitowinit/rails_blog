class CreateArticles < ActiveRecord::Migration[5.1]
  def change
    create_table :articles do |t|
      t.string :title, null:false
      t.text :abstract, null:false
      t.text :body, null:false
      t.string :image, default: 'https://getlogovector.com/wp-content/uploads/2019/07/neuralink-logo-vector.png'
      t.timestamps
    end
  end
end
