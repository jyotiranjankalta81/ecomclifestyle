import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { observer } from "mobx-react-lite";
import ProductStore from "../../store/ProductStore";
import { useLocation, useNavigate } from "react-router-dom";

// State Handler for event START

const CategoryFilter = (props) => {
  const [openCollection, setopenCollection] = React.useState(false);

  const handleClickOne = e => {
    setopenCollection(!openCollection);
  };

  return (
    <List>
      <ListItemButton
        onClick={handleClickOne}
        sx={{
          pl: 0,
          mt: 0,
          mb: 0,
          pt: 0,
          pb: 0,
          display: "flex",
          aliginItems: "center"
        }}
      >
        {openCollection ? <ExpandLess /> : <ExpandMore />}
        <span style={{ fontSize: "15px" }}>Category</span>
      </ListItemButton>
      <List sx={{ pt: 0, borderColor: "grey.500", mt: 0 }}>
        <Collapse
          in={openCollection}
          timeout='auto'
          unmountOnExit
          sx={{ pl: 0, pt: 0, pb: 0 }}
        >
          <List component='div' sx={{ pl: 0, pt: 0, pb: 0 }}>
            {props?.categoryList?.map((optionsName, index) => {
              return (
                <ListItemButton
                  onClick={() => props.chooseCategory(optionsName.CATEGORY_ID)}
                  sx={{
                    pl: 0,
                    pt: 0,
                    pb: 0,
                    display: "flex",
                    alignItems: "flex-start"
                  }}
                  key={index}
                >
                  <input type='checkbox' id={'category'} />
                  <span
                    htmlFor={'category'}
                    style={{
                      fontWeight: "400",
                      marginLeft: "10px",
                      fontSize: "14px"
                    }}
                  >
                    {optionsName?.CATEGORY_NAME}
                  </span>
                  {/* <ListItemText
                    sx={{ fontWeight: 400, fontSize: "0.5rem" }}
                    // primary={optionsName}
                  />
                  {optionsName} */}
                </ListItemButton>
              );
            })}
          </List>
        </Collapse>
      </List>
    </List>
  );
};
const SubCategoryFilter = (props) => {
  const [openCollection, setopenCollection] = React.useState(false);
  const handleClickOne = e => {
    setopenCollection(!openCollection);
  };
  return (
    <List>
      <ListItemButton
        onClick={handleClickOne}
        sx={{
          pl: 0,
          mt: 0,
          mb: 0,
          pt: 0,
          pb: 0,
          display: "flex",
          aliginItems: "center"
        }}
      >
        {openCollection ? <ExpandLess /> : <ExpandMore />}
        {/* <ListItemText
          primary={item.categoryName}
          sx={{
            pl: 1,
            m: 0,
            pt: 0,
            pb: 0,
            fontWeight: 700
          }}
        /> */}
        <span style={{ fontSize: "15px" }}>Sub Category</span>
      </ListItemButton>
      <List sx={{ pt: 0, borderColor: "grey.500", mt: 0 }}>
        <Collapse
          in={openCollection}
          timeout='auto'
          unmountOnExit
          sx={{ pl: 0, pt: 0, pb: 0 }}
        >
          <List component='div' sx={{ pl: 0, pt: 0, pb: 0 }}>
            {props?.subCategoryList?.map((optionsName, index) => {
              return (
                <ListItemButton
                  onClick={() => props.chooseSubCategory(optionsName.SUBCATEGORY_ID)}
                  sx={{
                    pl: 0,
                    pt: 0,
                    pb: 0,
                    display: "flex",
                    alignItems: "flex-start"
                  }}
                  key={index}
                >
                  <input type='checkbox' />
                  <span
                    style={{
                      fontWeight: "400",
                      marginLeft: "10px",
                      fontSize: "14px"
                    }}
                  >
                    {optionsName?.SUBCATEGORY_NAME}
                  </span>
                  {/* <ListItemText
                    sx={{ fontWeight: 400, fontSize: "0.5rem" }}
                    // primary={optionsName}
                  />
                  {optionsName} */}
                </ListItemButton>
              );
            })}
          </List>
        </Collapse>
      </List>
    </List>
  );
};
const BrandFilter = (props) => {
  const [openCollection, setopenCollection] = React.useState(false);
  useEffect(() => {
    if (props?.selected) {
      handleClickOne()
    }
  }, []);
  const handleClickOne = e => {
    setopenCollection(!openCollection);
  };
  return (
    <List>
      <ListItemButton
        onClick={handleClickOne}
        sx={{
          pl: 0,
          mt: 0,
          mb: 0,
          pt: 0,
          pb: 0,
          display: "flex",
          aliginItems: "center"
        }}
      >
        {openCollection ? <ExpandLess /> : <ExpandMore />}
        <span style={{ fontSize: "15px" }}>Brand</span>
      </ListItemButton>
      <List sx={{ pt: 0, borderColor: "grey.500", mt: 0 }}>
        <Collapse
          in={openCollection}
          timeout='auto'
          unmountOnExit
          sx={{ pl: 0, pt: 0, pb: 0 }}
        >
          <List component='div' sx={{ pl: 0, pt: 0, pb: 0 }}>
            {props?.brandList?.map((optionsName, index) => {
              return (
                <ListItemButton
                  onClick={() => props.chooseBrand(optionsName.BRAND_ID)}
                  sx={{
                    pl: 0,
                    pt: 0,
                    pb: 0,
                    display: "flex",
                    alignItems: "flex-start"
                  }}
                  key={index}
                >
                  <input type='checkbox' checked={props?.selected.includes(optionsName.BRAND_ID) } />
                  <span
                    style={{
                      fontWeight: "400",
                      marginLeft: "10px",
                      fontSize: "14px"
                    }}
                  >
                    {optionsName?.BRAND_NAME}
                  </span>
                  {/* <ListItemText
                    sx={{ fontWeight: 400, fontSize: "0.5rem" }}
                    // primary={optionsName}
                  />
                  {optionsName} */}
                </ListItemButton>
              );
            })}
          </List>
        </Collapse>
      </List>
    </List>
  );
};
const ColorFilter = (props) => {
  const [openCollection, setopenCollection] = React.useState(false);
  const handleClickOne = e => {
    setopenCollection(!openCollection);
  };
  return (
    <List>
      <ListItemButton
        onClick={handleClickOne}
        sx={{
          pl: 0,
          mt: 0,
          mb: 0,
          pt: 0,
          pb: 0,
          display: "flex",
          aliginItems: "center"
        }}
      >
        {openCollection ? <ExpandLess /> : <ExpandMore />}
        <span style={{ fontSize: "15px" }}>Color</span>
      </ListItemButton>
      <List sx={{ pt: 0, borderColor: "grey.500", mt: 0 }}>
        <Collapse
          in={openCollection}
          timeout='auto'
          unmountOnExit
          sx={{ pl: 0, pt: 0, pb: 0 }}
        >
          <List component='div' sx={{ pl: 0, pt: 0, pb: 0 }}>
            {props?.colorList?.map((optionsName, index) => {
              return (
                <ListItemButton
                  onClick={() => props.chooseColor(optionsName.PRODUCTCOLOR_ID)}
                  sx={{
                    pl: 0,
                    pt: 0,
                    pb: 0,
                    display: "flex",
                    alignItems: "flex-start"
                  }}
                  key={index}
                >
                  <input type='checkbox' />
                  <span
                    style={{
                      fontWeight: "400",
                      marginLeft: "10px",
                      fontSize: "14px"
                    }}
                  >
                    {optionsName?.PRODUCTCOLOR_NAME}
                  </span>
                  {/* <ListItemText
                    sx={{ fontWeight: 400, fontSize: "0.5rem" }}
                    // primary={optionsName}
                  />
                  {optionsName} */}
                </ListItemButton>
              );
            })}
          </List>
        </Collapse>
      </List>
    </List>
  );
};
const SizeFilter = (props) => {
  const [openCollection, setopenCollection] = React.useState(false);
  const handleClickOne = e => {
    setopenCollection(!openCollection);
  };
  return (
    <List>
      <ListItemButton
        onClick={handleClickOne}
        sx={{
          pl: 0,
          mt: 0,
          mb: 0,
          pt: 0,
          pb: 0,
          display: "flex",
          aliginItems: "center"
        }}
      >
        {openCollection ? <ExpandLess /> : <ExpandMore />}
        {/* <ListItemText
          primary={item.categoryName}
          sx={{
            pl: 1,
            m: 0,
            pt: 0,
            pb: 0,
            fontWeight: 700
          }}
        /> */}
        <span style={{ fontSize: "15px" }}>Size</span>
      </ListItemButton>
      <List sx={{ pt: 0, borderColor: "grey.500", mt: 0 }}>
        <Collapse
          in={openCollection}
          timeout='auto'
          unmountOnExit
          sx={{ pl: 0, pt: 0, pb: 0 }}
        >
          <List component='div' sx={{ pl: 0, pt: 0, pb: 0 }}>
            {props?.sizeList?.map((optionsName, index) => {
              return (
                <ListItemButton
                  onClick={() => props.chooseSize(optionsName.PRODUCTSIZE_ID)}
                  sx={{
                    pl: 0,
                    pt: 0,
                    pb: 0,
                    display: "flex",
                    alignItems: "flex-start"
                  }}
                  key={index}
                >
                  <input type='checkbox' />
                  <span
                    style={{
                      fontWeight: "400",
                      marginLeft: "10px",
                      fontSize: "14px"
                    }}
                  >
                    {optionsName?.PRODUCTSIZE_NAME}
                  </span>
                  {/* <ListItemText
                    sx={{ fontWeight: 400, fontSize: "0.5rem" }}
                    // primary={optionsName}
                  />
                  {optionsName} */}
                </ListItemButton>
              );
            })}
          </List>
        </Collapse>
      </List>
    </List>
  );
};

// END
const FilterList = observer((props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [colorList, setColorList] = useState();
  const [sizeList, setSizeList] = useState();
  const [brandList, setBrandList] = useState();
  const [categoryList, setCategoryList] = useState();
  const [subCategoryList, setSubCategoryList] = useState();

  const [colorOptions, setColorOptions] = useState([]);
  const [sizeOptions, setSizeOptions] = useState([]);
  const [brandOptions, setBrandOptions] = useState(props?.selected?[props?.selected]:[]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [subCategoryOptions, setSubCategoryOptions] = useState([]);

  useEffect(() => {
    ProductStore.getCategory()
    ProductStore.getSubCategory()
    ProductStore.getColor()
    ProductStore.getSize()
    ProductStore.getBrand()
    navigate(location.pathname, {}); 
  }, []);

  useEffect(() => {
    setColorList(ProductStore.data.colorList)
  }, [ProductStore.data.colorList]);
  useEffect(() => {
    setSizeList(ProductStore.data.sizeList)
  }, [ProductStore.data.sizeList]);
  useEffect(() => {
    setBrandList(ProductStore.data.brandList)
  }, [ProductStore.data.brandList]);
  useEffect(() => {
    setCategoryList(ProductStore.data.categoryList)
  }, [ProductStore.data.categoryList]);
  useEffect(() => {
    setSubCategoryList(ProductStore.data.subCategoryList)
  }, [ProductStore.data.subCategoryList]);

  useEffect(() => {
    applyFilter()
  }, [categoryOptions, subCategoryOptions, brandOptions, colorOptions, sizeOptions]);

  const applyFilter = () => {
    let param = {
      "CATEGORY_ID": categoryOptions,
      "SUBCATEGORY_ID": subCategoryOptions,
      "BRAND_ID": brandOptions,
      "PRODUCTSIZE_ID": sizeOptions,
      "PRODUCTCOLOR_ID": colorOptions
    }
    ProductStore.applyFilter(param);
  }
  const chooseCategory = (option) => {
    if (categoryOptions.find(x => x === option)) {
      const updatedItems = categoryOptions.filter((item) => item !== option); // create a new array with the item removed
      setCategoryOptions(updatedItems);
    } else {
      setCategoryOptions([...categoryOptions, option]);

    }
  };
  const chooseSubCategory = (option) => {
    if (subCategoryOptions.find(x => x === option)) {
      const updatedItems = subCategoryOptions.filter((item) => item !== option); // create a new array with the item removed
      setSubCategoryOptions(updatedItems);
    } else {
      setSubCategoryOptions([...subCategoryOptions, option]);

    }
  };
  const chooseBrand = (option) => {    
    if (brandOptions.find(x => x === option)) {
      const updatedItems = brandOptions.filter((item) => item !== option); // create a new array with the item removed
      setBrandOptions(updatedItems);
    } else {
      setBrandOptions([...brandOptions, option]);
    }
  };
  const chooseColor = (option) => {
    if (colorOptions.find(x => x === option)) {
      const updatedItems = colorOptions.filter((item) => item !== option); // create a new array with the item removed
      setColorOptions(updatedItems);
    } else {
      setColorOptions([...colorOptions, option]);

    }
  };
  const chooseSize = (option) => {
    if (sizeOptions.find(x => x === option)) {
      const updatedItems = sizeOptions.filter((item) => item !== option); // create a new array with the item removed
      setSizeOptions(updatedItems);
    } else {
      setSizeOptions([...sizeOptions, option]);

    }
  };
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <CategoryFilter categoryList={categoryList} chooseCategory={chooseCategory} />
      <SubCategoryFilter subCategoryList={subCategoryList} chooseSubCategory={chooseSubCategory} />
      <BrandFilter brandList={brandList} chooseBrand={chooseBrand} selected={brandOptions} />
      <ColorFilter colorList={colorList} chooseColor={chooseColor} />
      <SizeFilter sizeList={sizeList} chooseSize={chooseSize} />
    </List>
  );
})
export default FilterList;