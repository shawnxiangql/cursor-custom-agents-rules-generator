CREATE TABLE items (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    category VARCHAR(50),
    tags VARCHAR(255),
    location VARCHAR(100),
    purchase_date DATE,
    price DECIMAL(10,2),
    warranty_expiry DATE,
    images VARCHAR(512),
    owner_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE INDEX idx_items_owner_id ON items(owner_id);
CREATE INDEX idx_items_category ON items(category); 