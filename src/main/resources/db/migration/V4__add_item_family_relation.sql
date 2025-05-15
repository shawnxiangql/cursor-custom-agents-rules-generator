-- 添加物品与家庭组的关联
ALTER TABLE items ADD COLUMN family_id BIGINT;
ALTER TABLE items ADD CONSTRAINT fk_items_family FOREIGN KEY (family_id) REFERENCES families(id);
CREATE INDEX idx_items_family_id ON items(family_id); 