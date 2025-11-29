#!/bin/bash

systemctl --user stop portfolio.service
cp -r -v dist/publish/ ../running-apps/portfolio/
systemctl --user start portfolio.service