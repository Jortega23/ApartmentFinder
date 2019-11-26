class CreateApartments < ActiveRecord::Migration[6.0]
  def change
    create_table :apartments do |t|
      t.string :location
      t.text :address
      t.integer :zipcode
      t.text :description
      t.integer :cost

      t.timestamps
    end
  end
end
