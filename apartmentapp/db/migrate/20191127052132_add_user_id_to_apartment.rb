class AddUserIdToApartment < ActiveRecord::Migration[6.0]
  def change
    add_column :apartments, :user_id, :number
  end
end
