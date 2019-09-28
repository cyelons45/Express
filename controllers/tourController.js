const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkID = (req, res, next, val) => {
  // console.log(`Tour id is:${val}`);
  if (req.params.id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: `Invalid ID of ${val}`
    });
  }
  next();
};

///HANDLERS
exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestAt: req.requestTime,
    results: tours.length,
    data: {
      tours
    }
  });
};

exports.getTour = (req, res) => {
  const id = req.params.id * 1;

  const tour = tours.find(el => el.id === id);
  //   console.log (tour);
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tour
    }
  });
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'Fail',
      message: 'Tour must have a name and price'
    });
  }

  next();
};

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    err => {
      if (err) throw err;
      res.status(201).json({
        status: 'success',
        data: {
          newTour
        }
      });
    }
  );
};

exports.updateTour = (req, res) => {
  //   const tour = tours.find (el => el.id === id);
  //   console.log (tour);
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tour: `<Updated Tour Here...!>`
    }
  });
};

exports.deleteTour = (req, res) => {
  //   const tour = tours.find (el => el.id === id);
  //   console.log (tour);
  res.status(204).json({
    status: 'success',

    data: {
      tour: null
    }
  });
};
