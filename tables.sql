-- Create Customer table
CREATE TABLE Customer (
    CustomerID INT AUTO_INCREMENT PRIMARY KEY,
    FullName VARCHAR(100) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    PhoneNumber VARCHAR(15),
    DateOfBirth DATE,
    AgeVerified BOOLEAN DEFAULT FALSE,
    PaymentMethod VARCHAR(50),
    OrderHistory TEXT
);

-- Create Product table
CREATE TABLE Product (
    ProductID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Category VARCHAR(50),
    Brand VARCHAR(50),
    Price DECIMAL(10, 2) NOT NULL,
    VolumeOrQuantity VARCHAR(50),
    AgeRestriction BOOLEAN,
    AlcoholNicotineContent BOOLEAN,
    OtherIngredients TEXT
);

-- Create Merchant table
CREATE TABLE Merchant (
    MerchantID INT AUTO_INCREMENT PRIMARY KEY,
    StoreName VARCHAR(100) NOT NULL,
    Location VARCHAR(200),
    LicenseNumber VARCHAR(50),
    OperatingHours VARCHAR(100),
    Rating DECIMAL(2, 1)
);

-- Create Merchant_Product table (junction table for many-to-many relationship)
CREATE TABLE Merchant_Product (
    MerchantID INT NOT NULL,
    ProductID INT NOT NULL,
    PRIMARY KEY (MerchantID, ProductID),
    FOREIGN KEY (MerchantID) REFERENCES Merchant(MerchantID),
    FOREIGN KEY (ProductID) REFERENCES Product(ProductID)
);

-- Create Order table
CREATE TABLE `Order` (
    OrderID INT AUTO_INCREMENT PRIMARY KEY,
    CustomerID INT NOT NULL,
    OrderDateTime DATETIME DEFAULT CURRENT_TIMESTAMP,
    Status ENUM('Pending', 'In Progress', 'Delivered', 'Cancelled') NOT NULL,
    TotalAmount DECIMAL(10, 2),
    DeliveryAddress TEXT,
    DeliveryPartnerID INT,
    FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID),
    FOREIGN KEY (DeliveryPartnerID) REFERENCES DeliveryPartner(DeliveryPartnerID)
);

-- Create DeliveryPartner table
CREATE TABLE DeliveryPartner (
    DeliveryPartnerID INT AUTO_INCREMENT PRIMARY KEY,
    FullName VARCHAR(100) NOT NULL,
    PhoneNumber VARCHAR(15),
    VehicleType VARCHAR(50),
    LicenseNumber VARCHAR(50),
    Ratings DECIMAL(2, 1)
);

-- Create Order_Product table (junction table for many-to-many relationship)
CREATE TABLE Order_Product (
    OrderID INT NOT NULL,
    ProductID INT NOT NULL,
    PRIMARY KEY (OrderID, ProductID),
    FOREIGN KEY (OrderID) REFERENCES `Order`(OrderID),
    FOREIGN KEY (ProductID) REFERENCES Product(ProductID)
);

-- Create Payment table
CREATE TABLE Payment (
    PaymentID INT AUTO_INCREMENT PRIMARY KEY,
    OrderID INT NOT NULL,
    Amount DECIMAL(10, 2),
    DateTime DATETIME DEFAULT CURRENT_TIMESTAMP,
    Status ENUM('Pending', 'Completed', 'Failed') NOT NULL,
    PaymentMethod VARCHAR(50),
    FOREIGN KEY (OrderID) REFERENCES `Order`(OrderID)
);