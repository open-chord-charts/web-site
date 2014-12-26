# -*- coding: utf-8 -*-


# Open Chord Charts -- Database of free chord charts
# By: Christophe Benz <contact@openchordcharts.org>
#
# Copyright (C) 2012, 2013, 2014 Christophe Benz
# https://gitorious.org/open-chord-charts/
#
# This file is part of Open Chord Charts.
#
# Open Chord Charts is free software; you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as
# published by the Free Software Foundation, either version 3 of the
# License, or (at your option) any later version.
#
# Open Chord Charts is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Affero General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.


"""Unique controller for SPA (single-page application)"""


import json
import os

from webob.dec import wsgify

from . import conf


@wsgify
def index(req):
    index_template_file_path = os.path.join(conf['templates_dir'], 'index.html')
    with open(index_template_file_path) as index_template_file:
        index_template_str = index_template_file.read()
    appconfig_json = json.dumps({
        'apiBaseUrl': conf['api.base_url']
        })
    index_str = index_template_str.format(appconfig_json=appconfig_json)
    return index_str
