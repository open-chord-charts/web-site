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


"""Environment configuration"""


import logging.config
import os

from . import conf, conv


# Global environment variables

app_dir = os.path.dirname(os.path.abspath(__file__))
templates_dir = os.path.join(app_dir, 'templates')


def load_environment(global_conf, app_conf):
    """Build the application configuration dict."""
    global conf
    conf.update(conv.deep_decode(global_conf))
    conf.update(conv.deep_decode(app_conf))
    conf.update(conv.check(conv.struct(
        {
            'app_conf': conv.default(app_conf),
            'app_dir': conv.default(app_dir),
            'api.base_url': conv.pipe(conv.empty_to_none, conv.not_none),
            'global_conf': conv.default(global_conf),
            'templates_dir': conv.default(templates_dir),
            },
        default='drop',
        drop_none_values=False,
        ))(conf))

    # Logging
    logging.config.fileConfig(global_conf['__file__'])

    return conf
